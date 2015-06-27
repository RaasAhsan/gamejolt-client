rm -rf target/$1
electron-packager . GameJolt --platform=$1 --arch=x64 --version=0.28.3 --out=target/$1 --app-bundle-id=com.gamejolt --app-version=1.0 --ignore="(node_modules|less|javascripts|webpack.config.js|.gitignore|deploy_mac.sh)" --icon=public/images/gamejolt.icns
