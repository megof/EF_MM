var app = new Vue({
    el:'#app',
    data:{
        message:"",
        ls_apt:"Administrador",//tipo de usuario
        ls_adm:0,//tipo de usuario para modificaciones del administrador
        pin_apt:"",//pin de usuarios
        salary:[1800000,1500000,1300000],//salarios de los empleados (Ensamblador, Secretario, Vendedor)
        cnt_shoes:0,//cantidad máxima de zapatos permitida
        prc_shoes:5000,//costo de ensamble
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
    },
})