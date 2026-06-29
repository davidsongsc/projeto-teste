import { collaboratorService } from '@/src/services/collaborator.service';
import { useCollaboratorStore } from '@/src/store/useCollaboratorStore';
import {
    CollaboratorFilters,
    CreateCollaboratorDTO,
    UpdateCollaboratorDTO
} from '@/src/interfaces/collaborator';

export const useCollaborators = () => {
    const {
        collaborators,
        pagination,
        isLoading,
        setLoading,
        setCollaborators,
        addCollaborator,
        updateCollaborator: updateCollaboratorStore,
        removeCollaborator
    } = useCollaboratorStore();

    const fetchCollaborators = async (params?: CollaboratorFilters) => {
        setLoading(true);
        try {
            const data = await collaboratorService.list(params);
            setCollaborators(data);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const createCollaborator = async (data: CreateCollaboratorDTO) => {
        setLoading(true);
        try {
            const collaborator = await collaboratorService.create(data);
            addCollaborator(collaborator);
            return collaborator;
        } finally {
            setLoading(false);
        }
    };

    const updateCollaborator = async (id: string, data: UpdateCollaboratorDTO) => {
        setLoading(true);
        try {
            const collaborator = await collaboratorService.update(id, data);
            updateCollaboratorStore(id, collaborator);
            return collaborator;
        } finally {
            setLoading(false);
        }
    };

    const updateCollaboratorStatus = async (id: string, status: boolean) => {
        setLoading(true);
        try {
            const collaborator = await collaboratorService.updateStatus(id, status);
            updateCollaboratorStore(id, collaborator);
            return collaborator;
        } finally {
            setLoading(false);
        }
    };

    const deleteCollaborator = async (id: string) => {
        setLoading(true);
        try {
            await collaboratorService.remove(id);
            removeCollaborator(id);
        } finally {
            setLoading(false);
        }
    };

    return {
        collaborators,
        pagination,
        isLoading,
        fetchCollaborators,
        createCollaborator,
        updateCollaborator,
        updateCollaboratorStatus,
        deleteCollaborator
    };
};