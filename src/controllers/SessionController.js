// metodos: index, show, update, store, destroy
/**
 * index: listagem de sessoes
 * store: criar uma nova sessão
 * show: listar uma única sessao
 * update: alterar uma sessão
 * destroy: deletar uma sessão
 */
import * as Yup from "yup";
import User from "../models/User";

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });
        const { email } = req.body; // {email foi desconstruido}

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação." });
        }
        // fazendo uma verificação se o email/usuario já existe
        let user = await User.findOne({ email });
        if (!user) {
            // cria um novo
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

export default new SessionController();
