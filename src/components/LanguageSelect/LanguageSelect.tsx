import { DatoLanguage } from '../../types';
import { Chip, Avatar } from '@mui/material';
import { Done as DoneIcon, Language as LanguageIcon } from '@mui/icons-material';

const LanguageSelect = (props: {
  options?: { language: DatoLanguage; live: boolean }[] | [];
  value: number | null;
  live?: boolean;
  onChange: (language: number | null) => void;
}) => {
  const { options, value, onChange, live } = props;

  if (options && !options.length) return null;

  //if (options && options.length === 1) return <Chip avatar={<Avatar alt={} src="/static/images/avatar/1.jpg" /> label={options[0].name} icon={<LanguageIcon />} />

  return (
    <>
      {options?.map((option) => (
        <Chip
          sx={{
            mr: 1,
            fontSize: '0.8rem',
            fontFamily: 'sans-serif',
            fontWeight: value === option.language.id ? '700' : '600',
            borderWidth: 0,
          }}
          variant={value === option.language.id ? 'filled' : 'outlined'}
          avatar={
            option.language.image?.url ? (
              <Avatar alt={option.language.name} src={option.language.image?.url} />
            ) : undefined
          }
          color="secondary"
          key={option.language.id}
          label={`${option.language.name} ${
            !option.language.liveLabel
              ? ''
              : `(${option.live ? option.language.liveLabel : option.language.recordingLabel})`
          }`}
          icon={option.language.image?.url ? undefined : <LanguageIcon />}
          onClick={() => onChange(option.language.id)}
          deleteIcon={<DoneIcon sx={{ color: 'grey.300' }} />}
          onDelete={value === option.language.id && options.length > 1 ? () => {} : undefined}
        />
      ))}
    </>
  );
  /*
	return (
		<Select
			value={value}
			fullWidth
			onChange={e => onChange(e.target.value as number)}
			renderValue={(selected) => (
				<span style={{ paddingLeft: '32px', position: 'relative' }}>
					<LanguageIcon sx={{ position: 'absolute', left: 0, top: -3 }} />
					{options?.find(language => language.id === selected)?.name}
				</span>

			)}
		>
			{options?.map(option => (
				<MenuItem key={option.language.id} value={option.language.id}>{option.language.name}</MenuItem>
			))}
		</Select>
	)
	*/
};

export default LanguageSelect;
