import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Adresse du serveur PocketBase

// Récupérer tous les films triés par date de projection
export async function FilmSeance() {
    return await pb.collection('films').getFullList({
        sort: 'seance.date_heure',
        expand: 'seance'
    });
}

// Récupérer toutes les activités triées par type
export async function Activitetype() {
    return await pb.collection('activite').getFullList({
        sort: 'type'
    });
}

// Récupérer tous les invités triés par ordre alphabétique
export async function Invitealphabet() {
    return await pb.collection('invite').getFullList({
        sort: 'nom'
    });
}

// Récupérer les infos d'un film par son ID
export async function FilmId(filmId) {
    return await pb.collection('films').getOne(filmId, {
        expand: 'invite'
    });
}

// Récupérer les infos d'une activité par son ID
export async function ActiviteId(activityId) {
    return await pb.collection('activite').getOne(activityId);
}

// Récupérer les infos d'un invité par son ID
export async function InviteId(participantId) {
    return await pb.collection('invite').getOne(participantId);
}

// Ajouter ou modifier un film, une activité ou un invité
export async function addOrUpdateItem(collectionName, item) {
    if (item.id) {
        return await pb.collection(collectionName).update(item.id, item);
    } else {
        return await pb.collection(collectionName).create(item);
    }
}  
