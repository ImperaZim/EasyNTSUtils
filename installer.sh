# Remove o diretório antigo @imperazim
echo 'Limpandos versões anterioes!';
rm -rf @imperazim

# Clona o repositório com a branch main
echo 'Baixando sub-modulos:'
echo "- DiscordElmodulos"
echo "- JsonUtils"
echo "- ConsoleUtils"
echo "- MySQLUtils"
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git --quiet

# Cria o diretório @imperazim e move os arquivos para lá
echo 'Criando modulo @imperazim!'
mkdir -p @imperazim 

echo 'Instalando sub-modulos em @imperazim!'
mv EasyNTSUtils/src/* @imperazim/

echo 'Criando compilador tsconfig!'
mv EasyNTSUtils/tsconfig.json ./tsconfig.json

# Remove o diretório EasyNTSUtils
echo 'Removendo vestigios!'
rm -rf EasyNTSUtils

# Instala pacotes necessários
echo 'Instalando pacotes necessários!'
npm i colorette fs --silent

# Remove o arquivo installer.sh se existir
echo 'Removendo instalador!'
rm -rf ./installer.sh

# Mensagem de sucesso
echo 'EasyNTSUtils Instalado!';