/*
	General Bubble component
*/

import { styled } from '@mui/material/styles';
import { Theme, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade as Grow } from '@mui/material';
import { useState } from 'react';
import { hover } from '@testing-library/user-event/dist/hover';

interface BubbleProps {
  corner?: 'bl' | 'br' | 'tl' | 'tr' | 'none';
  size?: 'xs' | 'lg' | 'xl' | 'xxl' | 'sm' | 'md';
  color?: 'light' | 'primary';
  shadow?: boolean;
  smallText?: boolean;
  darkText?: boolean;
  icon?: boolean;
  children?: React.ReactNode;
  light?: boolean;
  to?: string;
  external?: boolean;
  caption?: string;
  timeout?: number;
  title?: string;
  tooltipPlacement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
  img?: string;
  hoverImg?: string;
  imgWidth?: string;
  onClick?: () => void;
}

interface BubbleWrapperProps {
  bubbleWrapperProps: {
    width: string;
    borderBottomRightRadius: string;
    borderBottomLeftRadius: string;
    borderTopRightRadius: string;
    borderTopLeftRadius: string;
    light?: boolean;
    caption?: string;
  };
}

const LinkOrOnClick = (props: {
  to?: string;
  onClick?: () => void;
  children: React.ReactElement;
  external?: boolean;
}) => {
  const { to, onClick, external } = props;
  let external2 = false;
  if (to?.substring(0, 4) === 'http') external2 = true;
  const style = { display: 'block', width: '100%', height: '100%', cursor: 'pointer' };
  if (to) {
    if (external2)
      return (
        <a target="_blank" rel="noreferrer noopener" href={to} style={style}>
          {props.children}
        </a>
      );
    else
      return (
        <Link style={style} to={to}>
          {props.children}
        </Link>
      );
  }
  if (onClick) {
    return (
      <div style={style} onClick={onClick}>
        {props.children}
      </div>
    );
  }
  return <div>{props.children}</div>;
};

const Bubble = (props: BubbleProps) => {
  const {
    size,
    corner,
    timeout,
    caption,
    title,
    tooltipPlacement,
    img,
    imgWidth,
    hoverImg,
    external,
    to,
    light,
  } = props;
  //"xl" is the default size
  const width = size === 'xs' ? '350px' : size === 'lg' ? '200px' : '450px';
  const borderRadius = size === 'xs' ? '250px' : size === 'lg' ? '140px' : '350px';
  const [image, setImage] = useState(img);
  const underMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const bubbleWrapperProps = {
    width,
    borderBottomRightRadius: corner === 'br' ? '0' : borderRadius,
    borderBottomLeftRadius: corner === 'bl' ? '0' : borderRadius,
    borderTopRightRadius: corner === 'tr' ? '0' : borderRadius,
    borderTopLeftRadius: corner === 'tl' ? '0' : borderRadius,
    light,
  };
  return (
    <Tooltip title={title ?? ''} placement={tooltipPlacement ?? 'top'}>
      <BubbleWrapper
        bubbleWrapperProps={bubbleWrapperProps}
        onMouseEnter={() => {
          if (hoverImg) setImage(hoverImg);
        }}
        onMouseLeave={() => {
          if (hoverImg) setImage(img);
        }}
      >
        <LinkOrOnClick external={external} to={to} onClick={props.onClick}>
          <>
            {!underMd && (
              <BubbleDecoration bubbleWrapperProps={bubbleWrapperProps}></BubbleDecoration>
            )}
            <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: timeout }}>
              <BubbleContent>
                <BubbleImage
                  src={underMd ? hoverImg : image}
                  alt={caption}
                  width={imgWidth}
                  size={size}
                />

                {/* 	{props.children} */}
                <BubbleCaption sx={{ fontSize: { xs: '11px', sm: '13px' } }}>
                  {caption}
                </BubbleCaption>
              </BubbleContent>
            </Grow>
          </>
        </LinkOrOnClick>
      </BubbleWrapper>
    </Tooltip>
  );
};

const BubbleDecoration = styled('div')<BubbleWrapperProps>(({ theme, bubbleWrapperProps }) => ({
  borderColor: theme.palette.secondary.main,
  width: '100%',
  height: '100%',
  borderBottomRightRadius: bubbleWrapperProps.borderBottomRightRadius,
  borderBottomLeftRadius: bubbleWrapperProps.borderBottomLeftRadius,
  borderTopRightRadius: bubbleWrapperProps.borderTopRightRadius,
  borderTopLeftRadius: bubbleWrapperProps.borderTopLeftRadius,
  zIndex: '10',
  borderStyle: 'solid',
  borderWidth: '1px',
  overflow: 'hidden',
  position: 'absolute',
  transition: 'all 0.3s ease-in-out',
  top: '-12px',
  left: '-12px',
  '&:hover': {
    top: '0px',
    left: '0px',
  },
}));

const BubbleWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bubbleWrapperProps',
})<BubbleWrapperProps>(({ theme, bubbleWrapperProps }) => ({
  //border: `2px solid ${theme.palette.secondary.main}`,
  display: 'inlineBlock',
  position: 'relative',
  zIndex: 101,
  aspectRatio: '1',
  backgroundColor: bubbleWrapperProps.light
    ? theme.palette.primary.light
    : theme.palette.primary.dark,
  transition: 'transform 0.2s, box-shadow 0.2s ',
  ...bubbleWrapperProps,
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 .2rem 1.5rem rgba(0,0,0,.15)!important',
  },
  boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important',
}));

const BubbleContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  width: '150px',
}));

const BubbleCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  minHeight: '38px',
  fontWeight: '200',
  textTransform: 'none',
  margin: 'auto',
  width: '85%',
  marginLeft: '12px',
}));

const BubbleImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'size',
})<{ width?: string; size?: string }>(({ theme, width, size }) => {
  if (width) return width;
  else
    return {
      width:
        size === 'xl'
          ? '140px'
          : size === 'lg'
          ? '100px'
          : size === 'md'
          ? '100px'
          : size === 'sm'
          ? '140px'
          : '70px',
      marginLeft: '-0px',
    };
});

export default Bubble;
