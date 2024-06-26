import AccountService from "@/services/AccountService";

class AccountController {
    async GetAllAccount(query: any, user: any) {
        try {
            return await AccountService.GetAllAccount(query, user);
        } catch (error) {
            throw error;
        }
    }

    async CreateAccount(body: any, userRole: string) {
        try {
            return await AccountService.CreateAccount(body, userRole);
        } catch (error) {
            throw error;
        }
    }

    async UpdateAccount(body: any, userRole: string) {
        try {
            return await AccountService.UpdateAccount(body, userRole);
        } catch (error) {
            throw error;
        }
    }

    async LockUnLockAccount(body: any, userRole: string) {
        try {
            return await AccountService.LockUnLockAccount(body, userRole);
        } catch (error) {
            throw error;
        }
    }

    async GetAccountById(id: string, userRole: string) {
        try {
            return await AccountService.GetAccountById(id, userRole);
        } catch (error) {
            throw error;
        }
    }

    async DeleteAccount(id: string, user: any) {
        try {
            return await AccountService.DeleteAccount(id, user);
        } catch (error) {
            throw error;
        }
    }

    async DeleteAccounts(body: any, userRole: string) {
        try {
            return await AccountService.DeleteAccounts(body, userRole);
        } catch (error) {
            throw error;
        }
    }

    async AdminResetPassword(id: string, username: string) {
        try {
            return await AccountService.AdminResetPassword(id, username);
        } catch (error) {
            throw error;
        }
    }
}

const accountController = new AccountController();
export default accountController;
