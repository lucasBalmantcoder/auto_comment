const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.commentWithDashes', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            const commentLength = 50; // Defina o comprimento desejado do comentário

            // Calcula o número de traços para cada lado
            const textLength = text.length;
            const totalDashes = commentLength - textLength - 4; // 4 = espaços e #
            const dashesPerSide = Math.max(0, Math.floor(totalDashes / 2)); // Garante que não seja negativo

            // Cria o comentário formatado
            const dashes = '-'.repeat(dashesPerSide);
            const comment = `# ${dashes} ${text} ${dashes}`;

            // Ajusta o comprimento do comentário para garantir que tenha exatamente `commentLength` caracteres
            const finalComment = comment.padEnd(commentLength, '-').substring(0, commentLength);

            // Substitui o texto selecionado pelo comentário formatado
            editor.edit(editBuilder => {
                editBuilder.replace(selection, finalComment);
            });
        }
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;