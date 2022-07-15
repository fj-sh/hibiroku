#!/bin/zsh

# .gitignore
gibo dump node > .gitignore

# Create directory
mkdir -p {src/background,src/contentScript,src/options,src/popup,src/static,src/utils}

# Create files
touch {tsconfig.json,webpack.common.js,webpack.dev.js,webpack.prod.js}

touch src/static/manifest.json
touch src/popup/popup.tsx
touch src/options/options.tsx
touch src/contentScript/contentScript.ts
touch src/background/background.ts

# Install dependency
npm i -D typescript react react-dom \
webpack webpack-cli terser-webpack-plugin webpack-merge html-webpack-plugin copy-webpack-plugin clean-webpack-plugin \
ts-loader style-loader css-loader \
@types/chrome @types/react @types/react-dom \
eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
tailwindcss postcss autoprefixer

# prettier
npm i -D prettier eslint-config-prettier
touch .prettierrc.js
cat << EOF > .prettierrc.js
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  semi: false,
}
EOF

# Setup eslint
npx eslint --init

# tsconfig.json
cat << EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# setup tailwindcss
npx tailwindcss init -p

cat << EOF > tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
