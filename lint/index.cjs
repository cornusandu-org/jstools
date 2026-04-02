const ts = require("typescript");
const fs = require("fs");
const path = require("path");


let warnings = 0;
let errors = 0;

function alwaysReturns(node) {
    if (!node) return false;

    switch (node.kind) {
        case ts.SyntaxKind.ReturnStatement:
        case ts.SyntaxKind.ThrowStatement:
            return true;

        case ts.SyntaxKind.Block: {
            for (const stmt of node.statements) {
                if (alwaysReturns(stmt)) return true;
            }
            return false;
        }

        case ts.SyntaxKind.IfStatement: {
            const thenReturns = alwaysReturns(node.thenStatement);
            const elseReturns = node.elseStatement
                ? alwaysReturns(node.elseStatement)
                : false;

            return thenReturns && elseReturns;
        }

        default:
            return false;
    }
}

function parse(file) {
    const code = fs.readFileSync(file, "utf8");

    const source = ts.createSourceFile(
        "file.ts",
        code,
        ts.ScriptTarget.Latest,
        true
    );

    function visit(node) {
        if (ts.isReturnStatement(node)) {
            if (
                node.expression &&
                node.expression.kind === ts.SyntaxKind.Identifier &&
                node.expression.getText() === "undefined"
            ) {
                const { line, character } = source.getLineAndCharacterOfPosition(node.pos);
                console.warn("WARNING: return undefined at", `${file}:${line}:${character}`, "(if you're sure this isn't a mistake, use the getUndefined() function defined in /types; otherwise, prefer using null)");
                warnings++;
            }
            if (
                node.expression === undefined
            ) {
                const { line, character } = source.getLineAndCharacterOfPosition(node.pos);
                console.error("ERROR: empty return at ", `${file}:${line}:${character}`);
                errors++;
            }
        } else if (ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)) {
            if (ts.isArrowFunction(node) && node.body.kind !== ts.SyntaxKind.Block) {
                return; // ex: (n) => n + 1
            }
            if (!(node.body && alwaysReturns(node.body))) {
                const { line, character } = source.getLineAndCharacterOfPosition(node.pos);
                console.error("ERROR: implicit return at ", `${file}:${line}:${character}`);
                errors++;
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(source);
}

function walk(dir, callback) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath, callback); // recurse
        } else {
            callback(fullPath);
        }
    }
}

walk("src", (file) => {
    if (file.endsWith(".ts")) {
        parse(file);
    }
});

console.log(`\n\n\nFound ${warnings} warnings and ${errors} errors.`)
