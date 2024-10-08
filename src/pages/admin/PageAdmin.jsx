import axios from 'axios';
import { URLS } from '../../constants/urls.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PageAdmin = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        recupererUtilisateurs();
        setReload(false);
    }, [reload])

    const recupererUtilisateurs = async () => {
        const { data } = await axios.get(URLS.USER_ALL);
        setUtilisateurs(data);
    }

    const supprimerUtilisateur = async (utilisateurID) => {
        try {
            const instance = axios.create({withCredentials: true})
            const reponse = await instance.delete(URLS.USER_DELETE + '/' + utilisateurID);
            alert("L'Utilisateur a bien été supprimé !");
            setReload(true);
        } catch ({response}) {
            alert(response.data.error); }
    }

    return (
        <>
            <h1>Bienvenue sur la page d'administration !</h1>

            <h2>Utilisateurs :</h2>
            <button onClick={() => navigate("/admin/utilisateur/creer")}>Créer un Utilisateur</button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Identifiant</th>
                    <th>Email</th>
                    <th>Prénom</th>
                    <th>Avatar</th>
                    <th>Role</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {
                    utilisateurs.map(
                        (utilisateur, cle) => (
                            <tr key={cle}>
                                <td>{utilisateur.id}</td>
                                <td>{utilisateur.identifiant}</td>
                                <td>{utilisateur.email}</td>
                                <td>{utilisateur.prenom}</td>
                                <td>{utilisateur.avatar? <img src={`http://localhost:8080/${utilisateur.avatar}`} /> : <img src={'https://i.pravatar.cc/96'} /> }</td>
                                <td>{utilisateur.role}</td>
                                <td><Link to={'/admin/utilisateur/modifier' + '/' + utilisateur.id}><EditIcon /></Link></td>
                                <td><DeleteIcon onClick={() => supprimerUtilisateur(utilisateur.id)} /></td>
                            </tr>
                        )
                    )
                }
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    );
};

export default PageAdmin;