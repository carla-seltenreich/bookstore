const axios = require('axios');
const City = require('../models/City');
const State = require('../models/State');

//acessa o via cep e traz um json com as informações referentes ao cep consultado
//se o atributo é igual ao que temos na tabela de cidades e estados ele considera o cep valido, 
//caso contrario é considerado como not found
class AddressController {
    index = async (req, res, next) => {
        try {
            const { data } = await axios.get('https://viacep.com.br/ws/' + req.params.cep + '/json/');

            const state = await State.findOne({
                where: {
                    province: data.uf
                }
            });

            const city = await City.findOne({
                where: {
                    name: data.localidade,
                    StateId: state.id
                }
            });
    
            return res.json({
                CityId: city.id,
                StateId: state.id
            });            
        } catch {
            res.json(400, {
                message: 'CEP not found.'
            })
        }
    }
}
module.exports = new AddressController();

