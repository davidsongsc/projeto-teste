import * as fs from 'fs';
import { execSync } from 'child_process';

function getGitTrackedFiles(): string[] {
    try {
        // Lista apenas os arquivos rastreados pelo Git
        const output = execSync('git ls-files', { encoding: 'utf-8' });
        return output.split('\n').filter(line => line.length > 0);
    } catch (error) {
        console.error("Erro: Certifique-se de que este é um repositório Git.");
        return [];
    }
}

function generateTreeFromList(files: string[]): string {
    const tree: any = {};

    files.forEach(file => {
        const parts = file.split('/');
        let current = tree;
        parts.forEach(part => {
            if (!current[part]) current[part] = {};
            current = current[part];
        });
    });

    function formatTree(obj: any, indent: string = ''): string {
        let result = '';
        const keys = Object.keys(obj).sort();

        keys.forEach((key, index) => {
            const isLast = index === keys.length - 1;
            const marker = isLast ? '└── ' : '├── ';
            result += `${indent}${marker}${key}\n`;

            const newIndent = indent + (isLast ? '    ' : '│   ');
            result += formatTree(obj[key], newIndent);
        });
        return result;
    }

    return formatTree(tree);
}

// Execução
const trackedFiles = getGitTrackedFiles();
const structure = `## Estrutura do Projeto (Arquivos Versionados)\n\n\`\`\`text\n${generateTreeFromList(trackedFiles)}\`\`\`\n`;

fs.writeFileSync('STRUCTURE.md', structure);
console.log('Arquivo STRUCTURE.md gerado com sucesso respeitando o .gitignore!');