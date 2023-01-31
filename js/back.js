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
    },
    methods:{
        guardarDatos(){
            switch (this.ls_apt) {
                case "Ensamblador":
                    this.employes.push({
                        type: this.ls_apt,
                        ex: this.hr_ex,
                        zpt: this.nm_zpt,
                        zpl: this.nm_zpl,
                        hj: this.hj,
                    })
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
            console.log(this.calc_salary(this.employes[0]))
        },
        calc_salary(employee){ 
            let sly = 0;        
            switch (employee.type) {
                case "Ensamblador":
                    sly = this.salary[0]+(4833*2.2*employee.ex);
                    if(employee.zpt>1000){
                        sly += employee.zpt*this.prc_shoes*1.1
                    }else if(employee.zpt>2000){
                        sly += employee.zpt*this.prc_shoes*1.2
                    }else{
                        sly += employee.zpt*this.prc_shoes
                    }
                    if(employee.zpl>1700){
                        sly += employee.zpl*this.prc_zpl*1.15
                    }else if(employee.zpl>3000){
                        sly += employee.zpl*this.prc_zpl*1.3
                    }else{
                        sly += employee.zpl*this.prc_zpl
                    }
                    sly +=this.sbd_tr                   
                    if(employee.hj==1){
                        sly += 80000
                    }else if(employee.hj>=2){
                        sly += 60000*employee.hj
                    }
                    break;
                case "Secretario":                    
                    sly = this.salary[1]+(4833*1.8*employee.ex);
                    break;
                case "Vendedor":     
                    if(sly>5000000 && sly<=10000000){
                        sly +=this.salary[2]*1.1;
                    }else if(sly>10000000){
                        sly +=this.salary[2]*1.2;
                    }else{                 
                        sly +=this.salary[2];
                    } 
                    sly += ((employee.vtz*this.prc_shoes + employee.vtl*this.prc_zpl)*(this.gain/100));
                    break;            
                default:
                    break;
            }
            return sly;
        },
        log_in(){
            (this.pin_apt==0123)?
            this.ls_apt = "1":
            this.ls_apt = "2";
        },
    },
})