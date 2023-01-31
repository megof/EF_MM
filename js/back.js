var app = new Vue({
    el:'#app',
    data:{
        message:"",
        ls_apt:"",//tipo de usuario
        ls_adm:0,//tipo de usuario para modificaciones del administrador
        ls_log:"",
        pin_apt:"",//pin de usuarios
        salary:[1800000,1500000,1300606],//salarios de los empleados (Ensamblador, Secretario, Vendedor)
        cnt_shoes:0,//cantidad máxima de zapatos permitidas
        cnt_zpl: 0,//cantidad máxima de zapatillas permitidas
        prc_shoes:5000,//costo de ensamble zapatos
        prc_zpl:3500,//costo de ensamble zapatillas
        gain:5,//comisión por venta
        hr_ex:0,//hora extra secretario/ensamblador
        sbd_tr:140606,//subsidio de transporte
        vnt:0,//ventas de zapatos (revisar)
        cnt_venzl:0,//cantidad de zapatillas vendida
        nm_zpt:0,//número de zapatos ensamblados
        nm_zpl:0,//número de zapatillas ensamblados
        hj:0,//hijos ensamblador
        employes:[],
        login:true,
        prnt:false,
    },
    methods:{
        guardarDatos(){
            switch (this.ls_apt) {
                case "Ensamblador":
                    if(this.nm_zpt<=this.cnt_shoes && this.nm_zpl<=this.cnt_zpl){
                        this.employes.push({
                            type: this.ls_apt,
                            ex: this.hr_ex,
                            zpt: this.nm_zpt,
                            zpl: this.nm_zpl,
                            hj: this.hj,
                            sry: this.calc_salary(),
                        })
                    }else{
                        this.message="cantidad excedida";
                    }
                    break;
                case "Secretario":
                    this.employes.push({
                        type: this.ls_apt,
                        ex: this.hr_ex,
                    })
                    break;
                case "Vendedor":
                    this.employes.push({
                        type: this.ls_apt,
                        vtz: this.vnt,
                        vtl: this.cnt_venzl,
                    })
                    break;            
                default:
                    break;
            }
            //console.log(this.calc_salary(this.employes[0]))
        },
        calc_salary(){ 
            let sly = 0;        
            switch (this.ls_apt) {
                case "Ensamblador":
                    sly = this.salary[0]+(4833*2.2*this.hr_ex);
                    if(this.nm_zpt>1000){
                        sly += this.nm_zpt*this.prc_shoes*1.1
                    }else if(this.nm_zpt>2000){
                        sly += this.nm_zpt*this.prc_shoes*1.2
                    }else{
                        sly += this.nm_zpt*this.prc_shoes
                    }
                    if(this.nm_zpl>1700){
                        sly += this.nm_zpl*this.prc_zpl*1.15
                    }else if(this.nm_zpl>3000){
                        sly += this.nm_zpl*this.prc_zpl*1.3
                    }else{
                        sly += this.nm_zpl*this.prc_zpl
                    }
                    sly += this.sbd_tr                   
                    if(this.hj==1){
                        sly += 80000
                    }else if(this.hj>=2){
                        sly += 60000*this.hj
                    }
                    break;
                case "Secretario":                    
                    sly = this.salary[1]+(4833*1.8*this.hr_ex);
                    break;
                case "Vendedor": 
                    sly += ((this.vnt*this.prc_shoes + this.cnt_venzl*this.prc_zpl)*(this.gain/100));    
                    if(sly>5000000 && sly<=10000000){
                        sly +=this.salary[2]*1.1;
                    }else if(sly>10000000){
                        sly +=this.salary[2]*1.2;
                    }else{                 
                        sly +=this.salary[2];
                    } 
                    break;            
                default:
                    break;
            }
            return sly;
        },
        log_in(){
            (this.pin_apt=="0123" && this.ls_log=="Administrador")?
                (this.ls_apt = "Administrador", this.login=false):
                (this.pin_apt=="1234" && this.ls_log=="Ensamblador")?
                    (this.ls_apt = "Ensamblador", this.login=false):
                    (this.pin_apt=="2345" && this.ls_log=="Secretario")?
                    (this.ls_apt = "Secretario", this.login=false):
                        (this.pin_apt=="3456" && this.ls_log=="Vendedor")?
                            (this.ls_apt = "Vendedor", this.login=false):
                            this.message = "Contraseña incorrecta";
        },
        prt(){
            this.prnt = !this.prnt
        },
        log_out(){
            this.login = true;
            this.ls_apt = "";
            this.prnt = false;
        },
    },
})