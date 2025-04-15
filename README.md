# API Docs Viewer

A personal OpenAPI documentation browser that's simple, clean, and ready to use. View any OpenAPI specification by URL or direct content paste.

## Features

- View OpenAPI/Swagger documentation in a modern, interactive interface
- Add specs via URL or by pasting YAML/JSON content
- Supports OpenAPI 2.0, 3.0, and 3.1
- All data stored locally in your browser - no server uploads

## Usage

1. Visit [API Docs Viewer](https://api-docs.milind.app)
2. Click "Add API Spec" button or the Settings icon
3. Choose one of the options:
   - **URL**: Paste a link to your hosted OpenAPI specification
   - **Content**: Paste your YAML/JSON OpenAPI specification directly
4. View and interact with your API documentation

Your specifications are saved in your browser's local storage for future visits.

## Built With

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Scalar API Reference](https://github.com/scalar/scalar) - For rendering OpenAPI documentation

## Development

If you want to run the application locally:

```bash
# Clone repository
git clone https://github.com/thatbeautifuldream/api-docs-viewer.git
cd api-docs-viewer

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## License

MIT License
