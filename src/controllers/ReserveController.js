import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";

class ReserveController {
    async index(req, res) {
        const { user_id } = req.headers;
        const reserves = await Reserve.find({ user: user_id }).populate(
            "house",
        );
        return res.json(reserves);
    }

    async store(req, res) {
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        try {
            const house_detalhe = await House.findById(house_id);
            // validacao verificando se existe ou nao a casa
            if (!house_detalhe) {
                return res.status(400).json({ error: "Essa casa não existe." });
            }
            // validando o status da casa
            if (house_detalhe.status !== true) {
                return res
                    .status(400)
                    .json({ error: "Solicitação indisponível." });
            }
            const user_detalhe = await User.findById(user_id);
            // evitando que o dono fda casa reserve a própria casa
            if (String(user_detalhe._id) === String(house_detalhe.user)) {
                return res
                    .status(401)
                    .json({ error: "Reserva não permitida." });
            }

            const reserve = await Reserve.create({
                user: user_id,
                house: house_id,
                date,
            });

            // Usando populate para preencher os dados do usuário e da casa

            return res.json({ reserve, user_detalhe, house_detalhe });
        } catch (error) {
            console.error("Erro ao criar reserva:", error);
            return res.status(500).json({ error: "Erro ao criar reserva" });
        }
    }

    async destroy(req, res) {
        const { reserve_id } = req.body;
        await Reserve.findByIdAndDelete({ _id: reserve_id });
        return res.send();
    }
}

export default new ReserveController();
