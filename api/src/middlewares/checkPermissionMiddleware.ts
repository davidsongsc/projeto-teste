import { Request, Response, NextFunction } from 'express';
export const checkPermission = (requiredKey: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(`[SECURITY DEBUG] Verificando permissão '${requiredKey}' para ID: ${req.user?.data?.id}`);
        
        const user = req.user as any;
        const profile = user?.data?.profile;
        const permissions = profile?.permissions;

        if (!permissions || !Array.isArray(permissions)) {
            console.error("[SECURITY ERROR] Estrutura de permissões inválida ou ausente.");
            return res.status(403).json({ success: false, message: 'Permissão negada (Falha estrutural).' });
        }

        const hasPermission = permissions.some((p: any) => {
            const pKey = typeof p === 'string' ? p : p.key;
            return pKey && pKey.trim() === requiredKey.trim();
        });

        if (!hasPermission) {
            console.warn(`[SECURITY WARNING] Permissão '${requiredKey}' não encontrada. Permissões disponíveis:`, permissions.map(p => p.key || p));
            return res.status(403).json({ success: false, message: 'Permissão insuficiente.' });
        }

        next();
    };
};