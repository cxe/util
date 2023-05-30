
class MyFunction extends Function {
    constructor() {
        super(`return this.invoke.apply(this.self, arguments)`);
        const { self } = Object.defineProperty(this, 'self', { value: this.bind(this) });
        // ...
        return self;
     }
     
     invoke(...args){
        // actual function implementation
     }
}
        
