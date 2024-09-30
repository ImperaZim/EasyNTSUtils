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

cat << 'EOF' > updateTsConfig.json


# Remove o arquivo installer.sh se existir
rm -rf ./installer.sh

# Mensagem de sucesso
echo 'EasyNTSUtils Instalado!';
