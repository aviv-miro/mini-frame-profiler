# Rapid Development Library Template

## Introduction
This template facilitates rapid development of small experimental libraries by enabling direct consumption from GitHub Pages. It's ideal for developers looking to bypass the conventional publishing to package repositories like NPM or Artifactory.

## Getting Started
1. **Fork the Repository**
    - Fork this repository to start your own project.

2. **Rename Your Library**
    - Update the library name in the `package.json` to reflect your project's identity.
      ```
      "name": "your-library-name"
      ```

3. **Access Your Built Library**
    - After making changes and pushing them or merging branches, GitHub Actions will automatically build your library and publish it to GitHub Pages.
    - To access your library, navigate to the 'Actions' tab in your GitHub repository after the build completes. Click on the latest workflow run.
    - Expand the "Output URL to file", "Output script tag", and "Output JavaScript script to inject script into page console" sections to obtain the necessary links and scripts.

## Usage
To include your library in your projects, use the provided script tag or the JavaScript injection script. Here’s how you can include the library:
```
<!-- Example of including the library using a script tag -->
<script src="https://<username>.github.io/<repository-name>/path/to/your/library.js"></script>
```
```
// Example of injecting the library via JavaScript
(function(){const s=document.createElement('script');s.src='https://<username>.github.io/<repository-name>/path/to/your/library.js';document.head.appendChild(s);})();
```

Please note: The library file will be available only after GitHub Actions has completed the setup of GitHub Pages.

## Local Development and Testing

### Developing Locally
To develop and test changes to your library in real-time, you can use the `dev` script. This script utilizes Webpack to watch for changes in your source files and automatically recompiles the library in development mode. To start the development server, run:

```
npm run dev
```

This will keep the server running and watching for any changes you make, allowing you to see the effects immediately.

### Testing with Sandbox
The `sandbox` folder contains an `index.html` file which serves as a test page that references your library directly from the local build in the `dist` directory. To view your library in action on your local machine:

1. **Start the Sandbox Server**:
   Run the `sandbox` script to launch a local server on port 3000, making your test page accessible via a web browser.
   ```
   npm run sandbox
   ```

2. **Access the Sandbox**:
   Open your web browser and go to `http://localhost:3000`. This will display the sandbox environment where you can interact with your library as it is developed.

## Features
- **Automatic Versioning**: Each push or merge triggers version updates and deployment.
- **Direct Access via GitHub Pages**: No need to publish to NPM or other repositories.
- **TypeScript and JSX Support**: Ready to handle projects using TypeScript or JSX, enhancing development flexibility for modern web applications.
