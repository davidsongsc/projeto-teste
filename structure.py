from pathlib import Path

ROOT = Path(".")
OUTPUT = ROOT / "STRUCTURE.md"

IGNORE = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "coverage",
    ".idea",
    ".vscode",
    "__pycache__",
    ".DS_Store",
}


def build_tree(directory: Path, prefix: str = ""):
    entries = sorted(
        [e for e in directory.iterdir() if e.name not in IGNORE],
        key=lambda e: (not e.is_dir(), e.name.lower())
    )

    lines = []

    for index, entry in enumerate(entries):
        last = index == len(entries) - 1
        connector = "└── " if last else "├── "

        lines.append(f"{prefix}{connector}{entry.name}")

        if entry.is_dir():
            extension = "    " if last else "│   "
            lines.extend(build_tree(entry, prefix + extension))

    return lines


tree = build_tree(ROOT)

content = "# Project Structure\n\n"
content += "> Automatically generated.\n\n"
content += "```text\n"
content += ".\n"
content += "\n".join(tree)
content += "\n```\n"

OUTPUT.write_text(content, encoding="utf-8")

print(f"{OUTPUT} generated successfully.")