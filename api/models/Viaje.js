/**
 * Created by Owner on 9/27/2014.
 */
module.exports = {
    connection : 'mysql-connection',
    schema : true,
    tableName : 'viaje',
    attributes : {
        id : {
            type : 'integer',
            primaryKey : true,
            unique : true
        },
        funcionario : {
            model : 'Funcionario'
        },
        mec_origen : 'string',
        institucion_genera : 'string',
        UR : 'string',
        tipo_rep : 'string',
        consecutivo : 'string',
        nombre : 'string',
        cargo : 'string',
        grupo : 'string',
        tipo_viaje : 'string',
        acuerdo : 'string',
        oficio : 'string',
        pais_origen : 'string',
        estado_origen : 'string',
        ciudad_origen : 'string',
        pais_destino : 'string',
        estado_destino : 'string',
        ciudad_destino : 'string',
        tarifa_diaria : 'string',
        moneda : 'string',
        tema : 'string',
        tipo_com : 'string',
        evento : 'string',
        evento_url : 'string',
        fecha_inicio_part : 'string',
        fecha_fin_part : 'string',
        motivo : 'string',
        antecedente : 'string',
        actividad : 'string',
        resultado : 'string',
        contribucion_ifai : 'string',
        url_comunicado : 'string',
        pasaje_cubre : 'string',
        pasaje_tipo : 'string',
        linea_origen : 'string',
        vuelo_origen : 'string',
        linea_regreso : 'string',
        vuelo_regreso : 'string',
        fecha_inicio_com : 'string',
        fecha_fin_com : 'string',
        gasto_pasaje : 'float',
        gasto_viatico : 'float',
        gasto_total : 'float',
        inst_hospedaje : 'string',
        hotel : 'string',
        fecha_inicio_hotel : 'string',
        fecha_fin_hotel : 'string',
        costo_hotel : 'string',
        viatico_comprobado : 'string',
        viatico_sin_comprobar : 'string',
        viatico_devuelto : 'string',
        observaciones : 'string',
        destino_latitud : 'string',
        origen_latitud : 'string',
        destino_longitud : 'string',
        origen_longitud : 'string'
    },

    afterCreate : function(viaje,cb){
        Common.sendViajeUpdate(viaje,cb);
    }
};