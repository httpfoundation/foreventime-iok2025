import { useParams } from "react-router-dom"
import { usePresenterWithTalksByStage } from "../../Store"
//import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import {PageContainer, PageTitle, Paragraph, ScheduleItem} from "../../components"
import { Grid, Typography, TypographyProps } from "@mui/material"
import { PageSubtitle } from "../../components"
import { styled } from '@mui/material/styles'

const PresenterImage = styled('img')`
	width: 100%;
	height: auto;
	border-radius: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

const SectionTitle = styled(Typography)`
	font-weight: 700;
	margin: 1rem 0;
`

export const SinglePresenter = () => {

	const { presenterSlug } = useParams()

	const presenter = usePresenterWithTalksByStage(presenterSlug ?? null)
	console.log(presenter)

	return (
		<PageContainer container>
			<PageTitle >Előadó</PageTitle>
			<Grid container spacing={4} sx={{mb: 4}}>
				<Grid item xs={12} md={4}>
					<PresenterImage src={presenter?.image?.url} alt={presenter?.name} />
				</Grid>
				<Grid item xs={12} md={8} sx={{display: "flex", flexDirection: "column", justifyContent: "flex-end", pb: 1}}>
					<TalkTitle align="left">{presenter?.name}</TalkTitle>
					<PageSubtitle>{presenter?.title}, {presenter?.company}</PageSubtitle>
					{presenter?.bio && <Paragraph>
						{presenter.bio}
					</Paragraph>}
				</Grid>
			</Grid>
			{ presenter.talksByStage?.map(stage => <>
				<SectionTitle variant="h5">"{stage?.name}" szekció</SectionTitle>
				{ stage.schedule?.map(talk => <ScheduleItem key={talk.id} open talkId={talk.id} />)}
				</>
			) }
		</PageContainer>
	)
}

const TalkTitle = styled("h2")<TypographyProps>(({theme}) => `
	text-align: "left";
	margin: -${theme.spacing(2)} 0 ${theme.spacing(2)} 0;
`)

export default SinglePresenter