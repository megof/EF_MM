var app = new Vue({
    el:'#app',
    data:{
        message:"",
        ls_apt:"Administrador",//tipo de usuario
        ls_adm:0,//tipo de usuario para modificaciones del administrador
        pin_apt:"",//pin de usuarios
        salary:[1800000,1500000,1300000],//salarios de los empleados (Ensamblador, Secretario, Vendedor)
        cnt_shoes:0,//cantidad máxima de zapatos permitida
        prc_shoes:5000,//costo de ensamble zapatos
        prc_zpl:3500,//costo de ensamble zapatillas
        gain:1000,//comisión por venta
        hr_ex:0,//hora extra secretario/ensamblador
        sbd_tr:0,//subsidio de transporte
        vnt:0,//ventas de zapatos (revisar)
        nm_zpt:0,//número de zapatos ensamblados
        nm_zpl:0,//número de zapatillas ensamblados
        hj:0,//hijos ensamblador
        employes:[],
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
                    })
                    break;            
                default:
                    break;
            }
        },
        calc_salary(employee){ 
            let sly = 0;           
            switch (employee.type) {
                case "Ensamblador":
                    sly = salary[0]+(4833*2.2*employee.ex);
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
                    sly +=140000                    
                    if(employee.hj=1){
                        sly += 80000
                    }else if(employee.hj>=2){
                        sly += 60000*employee.hj
                    }
                    break;
                case "Secretario":
                    break;
                case "Vendedor":
                    break;            
                default:
                    break;
            }
        },
    },
})