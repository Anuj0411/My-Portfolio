# Linting and Code Quality Configuration

This project uses ESLint and Prettier to maintain code quality and consistent formatting.

## 🛠️ Tools Configured

### ESLint

- **Purpose**: Static code analysis to find and fix problems
- **Version**: 9.15.0
- **Plugins**:
  - `eslint-plugin-react` - React specific linting rules
  - `eslint-plugin-react-hooks` - Enforce rules of Hooks
  - `eslint-plugin-react-refresh` - Validate fast refresh requirements
  - `eslint-plugin-prettier` - Run Prettier as an ESLint rule

### Prettier

- **Purpose**: Opinionated code formatter
- **Version**: 3.8.1
- **Integration**: Runs as part of ESLint with `eslint-plugin-prettier`

### Husky

- **Purpose**: Git hooks management
- **Version**: 9.1.7
- **Hook**: Pre-commit hook to run linting before commits

### lint-staged

- **Purpose**: Run linters on staged git files
- **Version**: 16.4.0
- **Configuration**: Auto-fixes JS/JSX files and formats JSON/CSS/MD files

## 📋 Available Scripts

```bash
# Run ESLint to check for issues
npm run lint

# Run ESLint and automatically fix issues
npm run lint:fix

# Format all files with Prettier
npm run format

# Check formatting without making changes
npm run format:check
```

## 🎨 Code Style Rules

### JavaScript/JSX

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS, double quotes for JSX
- **Semicolons**: Required
- **Line length**: 100 characters max
- **Trailing commas**: ES5 style
- **Arrow functions**: Always use parentheses around arguments

### React

- React 18+ - no need to import React in JSX scope
- PropTypes disabled (TypeScript recommended for type checking)
- Fast refresh warnings for component exports
- Three.js properties are allowed (intensity, position, args, etc.)

## 🔧 ESLint Rules

Key rules enabled:

- `no-console`: Warn (allows console.warn and console.error)
- `no-unused-vars`: Warn (allows variables prefixed with \_)
- `prefer-const`: Error
- `no-var`: Error
- `eqeqeq`: Error (always use === instead of ==)
- `no-duplicate-imports`: Error

## 🎯 Pre-commit Hooks

When you commit code, the following happens automatically:

1. **lint-staged** runs on staged files
2. **ESLint** auto-fixes JavaScript/JSX issues
3. **Prettier** formats all staged files
4. If there are unfixable errors, the commit is blocked

## 📝 Editor Integration

### VS Code (Recommended)

The project includes `.vscode/settings.json` with:

- Format on save enabled
- Prettier as default formatter
- ESLint auto-fix on save
- Recommended extensions in `.vscode/extensions.json`

**Install these VS Code extensions:**

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier - Code formatter (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- ES7+ React snippets (`dsznajder.es7-react-js-snippets`)

### Other Editors

The project includes `.editorconfig` for consistent coding styles across different editors:

- UTF-8 encoding
- LF line endings
- 2 space indentation
- Trim trailing whitespace
- Insert final newline

## 🚫 Ignored Files

The following are ignored by linting tools:

- `node_modules/`
- `dist/`
- `build/`
- `.netlify/`
- `public/desktop_pc/` and `public/planet/` (3D model files)
- Environment files (`.env*`)

## 🐛 Common Issues

### Issue: Lint errors on commit

**Solution**: Run `npm run lint:fix` before committing

### Issue: Prettier conflicts with ESLint

**Solution**: Already configured with `eslint-config-prettier` to disable conflicting rules

### Issue: Three.js properties showing as unknown

**Solution**: Already configured in ESLint to ignore Three.js specific props

### Issue: React warnings about fast refresh

**Solution**: These are warnings only - consider refactoring components to separate files for better performance

## 📚 More Information

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
