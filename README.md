# Gitty - A Git-Like Version Control System (VCS)

Gitty is a lightweight, Git-like Version Control System (VCS) built from scratch using **Node.js**. This tool offers core functionalities like initializing a repository, staging files, committing changes, and checking the status of files. It aims to provide a deeper understanding of how version control systems work internally.

---

## Features

- **`init` Command**: Creates an empty repository with necessary directories (like `.git` in Git).
- **`add` Command**: Stages files for the next commit.
- **`commit` Command**: Commits staged files, storing their contents in the `objects` directory.
- **`status` Command**: Displays the current status of files (whether staged or committed).

---

## How to Use Gitty

### 1. Initialize a Repository
Run the `init` command to create a `.ngit` directory in your current folder. This directory contains the following subdirectories:
- `objects`: Stores the content of committed files as hashed objects.
- `refs`: Tracks references to commits.
- `staging`: Holds files staged for the next commit.

**Command:**
```bash
node src/index.js init
```

### 2. Add Files to Staging
Use the `add` command to stage files for the next commit. The file's contents are hashed and stored in the `objects` directory, while its hash is tracked in the `staging` area.

**Command:**
```bash
node src/index.js add <filename>
```

### 3. Commit Staged Files
Commit all staged files by running the `commit` command. Files are removed from the `staging` area and added to the `objects` directory permanently.

**Command:**
```bash
node src/index.js commit -m "commit message"
```

### 4. Check File Status
Use the `status` command to check the state of your files. It shows whether files are staged, committed, or untracked.

**Command:**
```bash
node src/index.js status
```

---

## Directory Structure
Once initialized, the `.ngit` directory will look like this:
```
.ngit/
├── objects/
├── refs/
└── staging/
```

- **`objects/`**: Stores committed file contents as hashed objects.
- **`refs/`**: Stores references to commits.
- **`staging/`**: Temporarily holds files staged for the next commit.

---

## Dependencies
This project uses the following npm modules:
- **`chalk`**: For colorful and formatted CLI output.
- **`fs-extra`**: For enhanced filesystem operations.
- **`crypto`**: For hashing file contents.
- **`commander`**: For handling CLI arguments and commands.

---

## Example Workflow
1. **Initialize Repository:**
   ```bash
   node src/index.js init
   ```
2. **Create a File:**
   ```bash
   echo "Hello Gitty" > example.txt
   ```
3. **Add File to Staging:**
   ```bash
   node src/index.js add example.txt
   ```
4. **Commit the File:**
   ```bash
   node src/index.js commit -m "Initial commit"
   ```
5. **Check Status:**
   ```bash
   node src/index.js status
   ```

---

## Why Gitty?
Gitty was built as a learning project to understand how Git works internally. It provides a hands-on experience with key concepts such as:
- Hashing file contents
- Staging area and commit workflows
- File system management in version control systems

---

## Future Improvements
- Support for branching and merging.
- Implementation of a log command to view commit history.
- Improved error handling and CLI feedback.

---

## Contributing
Feel free to fork the repository, suggest improvements, or report issues! 🚀

---

## License
This project is licensed under the MIT License.

---

Happy Coding! 🎉

