//CLASE PARA IMPLEMENTAR EN LAS OTRAS
interface DBMANAGER {
    save(object :any) :any;
    delete(object :any) :any;
    getObject(id :number|string) :any;
    getObjects() :any;
}
