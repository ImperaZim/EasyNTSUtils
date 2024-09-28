
mkdir -p ./src/
mkdir -p ./src/utils/

cd ./src/utils/

rm -rf EmbedUtils/ JsonUtils/ ConsoleUtils/ MySQLUtils/ index.ts

git clone "https://github.com/ImperaZim/EasyNTSUtils.git" 
cd EasyNTSUtils
mv ./src/* ../

cd ../ 
rm -rf EasyNTSUtils
cd ../../

cat << 'EOF' > updateTsConfig.js
const fs = require('fs');

const filePath = './tsconfig.json';

if (fs.existsSync(filePath)) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Adiciona baseUrl
  data.compilerOptions = {
    ...data.compilerOptions,
    baseUrl: './',
    paths: {
      ...data.compilerOptions.paths,
      '#utils': ['./src/utils/index.ts'],
      '#console': ['./src/utils/ConsoleUtils/index.ts'],
      '#json': ['./src/utils/JsonUtils/index.ts'],
      '#mysql': ['./src/MySQLUtils/index.ts'],
      '#embed': ['./src/utils/EmbedUtils/index.ts'],
    },
  };

  // Escreve o arquivo de volta
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("EasyNTSUtils Instalado!");
}
EOF

node updateTsConfig.js

rm updateTsConfig.js

rm -rf ./installer.sh 

echo "EasyNTSUtils Instalado!";