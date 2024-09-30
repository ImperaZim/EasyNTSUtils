# Remove o diretório antigo @imperazim
rm -rf @imperazim

# Clona o repositório com a branch main
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git

# Cria o diretório @imperazim e move os arquivos para lá
mkdir -p @imperazim
mv EasyNTSUtils/src/* @imperazim/

# Remove o diretório EasyNTSUtils
rm -rf EasyNTSUtils

# Instala pacotes necessários
npm i colorette fs --silent

rm tsconfig.json 

cat <<EOF> tsconfig.json 
{
  "compilerOptions": {
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "strict": true,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./build",
    "rootDir": "./src",
    "baseUrl": "./@imperazim/",
    "paths": {
      "Utils": ["./"],
      "Console": ["./ConsoleUtils"],
      "Json": ["./JsonUtils"],
      "MySQL": ["./MySQLUtils"],
      "DiscordElementor/*": ["DiscordElementor/*"],
      "DiscordElementor": ["DiscordElementor"],
      "DiscordElementCollector/*": ["DiscordElementor/collector/*"],
      "DiscordElementCollector": ["DiscordElementor/collector"],
      "DiscordRow/*": ["DiscordElementor/row/*"],
      "DiscordRow": ["DiscordElementor/row"],
      "DiscordRowEmbed": ["DiscordElementor/row/embed"],
      "DiscordRowButton": ["DiscordElementor/row/component/button"],
      "DiscordRowSelect": ["DiscordElementor/row/component/select"],
      "DiscordModal/*": ["DiscordElementor/modal/*"],
      "DiscordModal": ["DiscordElementor/modal"],
      "DiscordModalInput": ["DiscordElementor/modal/component/input"],
      "DiscordModalComponent": ["DiscordElementor/modal/component"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
EOF

# Remove o arquivo installer.sh se existir
rm -rf ./installer.sh

# Mensagem de sucesso
echo 'EasyNTSUtils Instalado!';
