const requireDirectory = require('require-directory')
const Router = require('koa-router')
const path = require('path')

class InitManager{
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
    }
    static initLoadRouters(){
        // const apiDirectory = process.cwd()   // process.cwd()返回的执行 node命令的目录
        // const apiDirectory = path.resolve(__dirname,__filename)  
        const modules = requireDirectory(module, '../app/api', {visit:whenLoadModule})
        function whenLoadModule(obj) {
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager