# Remove o diretório antigo @imperazim
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mLimpandos versões anterioes!";
rm -rf @imperazim

# Clona o repositório com a branch main
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mBaixando sub-modulos:"
echo -e "\e[1;33m[imperazim/utils]\e[0m \e[1;37mDiscordElmodulos Instalado"
echo -e "\e[1;33m[imperazim/utils]\e[0m \e[1;37mJsonUtils Instalado"
echo -e "\e[1;33m[imperazim/utils]\e[0m \e[1;37mConsoleUtils Instalado"
echo -e "\e[1;33m[imperazim/utils]\e[0m \e[1;37mMySQLUtils Instalado"
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git --quiet
 
# Cria o diretório @imperazim e move os arquivos para lá
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mCriando modulo @imperazim!"
mkdir -p @imperazim 

echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mInstalando sub-modulos em @imperazim!"
mv EasyNTSUtils/src/* @imperazim/

echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mCriando compilador tsconfig!"
mv EasyNTSUtils/tsconfig.json ./tsconfig.json

# Remove o diretório EasyNTSUtils
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mRemovendo vestigios!"
rm -rf EasyNTSUtils

# Instala pacotes necessários
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mInstalando pacotes necessários!"
npm i colorette fs --silent

# Remove o arquivo installer.sh se existir
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mRemovendo instalador!"
rm -rf ./installer.sh

# Mensagem de sucesso
echo -e "\e[1;33m[imperazim]\e[0m \e[1;37mEasyNTSUtils Instalado!";