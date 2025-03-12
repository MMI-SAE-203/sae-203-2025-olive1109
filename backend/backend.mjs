import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090'); // Adresse du serveur PocketBase

// Récupérer tous les films triés par date de projection
export const getFilms = async (collection = "films") => {
    try {
        const films = await pb.collection(collection).getFullList({
            expand: 'seance'
        });

        // Vérifier que les films ont bien une date de projection
        console.log("Films bruts :", films);

        // Trier les films par date de projection
        const sortedFilms = films.sort((a, b) => 
            new Date(a.seance?.date_heure) - new Date(b.seance?.date_heure)
        );

        console.log("Films triés :", sortedFilms);
        return sortedFilms;
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
        return [];
    }
};  

// Récupérer les infos d'un film par son ID

export const getFilmInfoById = async (collection = "films", filmId) => {
    try {
        const film = await pb.collection(collection).getOne(filmId);
        // Ajouter l'URL complète de l'image au film
        const updatedFilm = {
            ...film,
            imageUrl: film.affiche
                ? pb.files.getURL(film, film.affiche[0], { thumb: "1024x1024" })
                : null,
        };
        return updatedFilm;
    } catch (error) {
        console.error("Erreur lors de la récupération du film :", error);
        return null; // Retourne null en cas d'erreur
    }
};

// Récupérer toutes les activités triées par type
export async function Activitetype() {
    try {
        const ActiviteparType = await pb.collection('activite').getFullList({
            sort: 'type'
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des activités :", error);
        return [];
    }
}

// Récupérer tous les invités triés par ordre alphabétique
export async function Invitealphabet() {
    try {
        const Ivite = await pb.collection('invite').getFullList({
            sort: 'nom'
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des invités :", error);
        return [];
    }
}

// Récupérer les infos d'une activité par son ID
export async function ActiviteId(activityId) {
    try {
        const Activite = await pb.collection('activite').getOne(activityId);
    } catch (error) {
        console.error("Erreur lors de la récupération des infos de l'activité :", error);
        return null;
    }
}
// Récupérer les infos d'un invité par son ID
export async function InviteId(participantId) {
    try {
        const Invite = await pb.collection('invite').getOne(participantId);
    } catch (error) {
        console.error("Erreur lors de la récupération des infos de l'invité :", error);
        return null;
    }
}
// Ajouter ou modifier un film, une activité ou un invité
export async function InviteId(participantId) {
    try {
        return await pb.collection('invite').getOne(participantId);
    } catch (error) {
        console.error("Erreur lors de la récupération des infos de l'invité :", error);
        return null;
    }
} 
