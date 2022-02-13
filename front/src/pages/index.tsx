import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { CenteredDiv } from '../components/cssHelpers/CenteredDiv'
import MainLayout from '../components/layouts/MainLayout'
import { WorkplaceSvg } from '../components/WorkplaceSvg/WorkplaceSvg'
import { AppStore } from '../stores/AppStore'
import { HomePageStore } from './HomePageStore'

const HomePage = observer(() => {
    const homePageStore = useMemo(() => new HomePageStore(), [])

    useEffect(() => {
        AppStore.eventsStore.setRoomName('')
    }, [])

    return (
        <MainLayout>
            <CenteredDiv>
                <Button
                    sx={{
                        position: 'relative',
                        bottom: {
                            sm: undefined,
                            md: '40px',
                        },
                    }}
                    onClick={() => AppStore.navigate('/room')}
                >
                    Voir toutes les salles
                </Button>
            </CenteredDiv>
            <CenteredDiv>
                <WorkplaceSvg
                    onClick={(room) => homePageStore.onClick(room)}
                    backgroundColor={(room) => homePageStore.getRoomColor(room)}
                    backgroundColorHover={(room) => homePageStore.getRoomMouseOverColor(room)}
                />
            </CenteredDiv>
        </MainLayout>
    )
})

export default HomePage
