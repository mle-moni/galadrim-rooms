import { CreateUser } from '../../../components/admin/CreateUser'
import MainLayout from '../../../components/layouts/MainLayout'
import { useRights } from '../../../hooks/useRights'

export const CreateUserPage = () => {
    useRights('all', ['USER_ADMIN'], '/admin')

    return (
        <MainLayout fullscreen>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CreateUser />
            </div>
        </MainLayout>
    )
}

export default CreateUserPage
