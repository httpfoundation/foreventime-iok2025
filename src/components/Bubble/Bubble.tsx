/*
	General Bubble component
*/

import { styled } from '@mui/material/styles';
import { Theme, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade as Grow } from '@mui/material';
import { useState } from 'react';
import { hover } from '@testing-library/user-event/dist/hover';
import zIndex from '@mui/material/styles/zIndex';

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
  position?: 'top' | 'bottom';
  onMobile?: boolean;
  index?: number;
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
    onMobile?: boolean;
    index?: number;
    position?: 'top' | 'bottom';
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
    position,
    onMobile,
    index
  } = props;
  //"xl" is the default size
  const width = '100%'
  const borderRadius = 0;
  const [image, setImage] = useState(img);
  const underMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const bubbleWrapperProps = {
    width,
    borderBottomRightRadius: corner === 'br' ? '0' : borderRadius,
    borderBottomLeftRadius: corner === 'bl' ? '0' : borderRadius,
    borderTopRightRadius: corner === 'tr' ? '0' : borderRadius,
    borderTopLeftRadius: corner === 'tl' ? '0' : borderRadius,
    light,
    position,
    onMobile: onMobile,
    index
  };
  return (
    <Tooltip title={title ?? ''} placement={tooltipPlacement ?? 'top'}>
      <>
     {/*  {!underMd && position === "bottom" && (
        <BubbleDecoration bubbleWrapperProps={bubbleWrapperProps}></BubbleDecoration>
      )} */}
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
            <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: timeout }}>
              <BubbleContent>
                <BubbleImage
                  src={underMd ? hoverImg : image}
                  alt={caption}
                  width={imgWidth}
                  size={size}
                />
                <BubbleCaption sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                  {caption}
                </BubbleCaption>
              </BubbleContent>
            </Grow>
        </LinkOrOnClick>
      </BubbleWrapper>
      </>
    </Tooltip>
  );
};

const BubbleDecoration = styled('div')<BubbleWrapperProps>(({ theme, bubbleWrapperProps }) => ({
  width: '100%',
  height: '100%',
  zIndex: '10',
  overflow: 'hidden',
  position: 'absolute',
  transition: 'all 0.3s ease-in-out',
  top: '12px',
  left: '12px',
  '&:hover': {
    top: '0px',
    left: '0px',
  },
  background: 'linear-gradient(135deg, #50D1FF 0%, #307D99 100%)',
}));

const BubbleWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bubbleWrapperProps',
})<BubbleWrapperProps>(({ theme, bubbleWrapperProps }) => ({
  //border: `2px solid ${theme.palette.secondary.main}`,
  display: 'inline-block',
  position: 'relative',
  zIndex: 101,
  aspectRatio: '1',
  backgroundColor: (bubbleWrapperProps.index % 2 === 0)
    ? theme.palette.primary.light
    : theme.palette.primary.dark,
  transition: 'transform 0.2s, box-shadow 0.2s',
  ...bubbleWrapperProps,
  '&:hover': {
    
    boxShadow: '0 .2rem 1.5rem rgba(0,0,0,.15)!important',
    background: 'linear-gradient(-45deg,rgb(189, 189, 189) 0%, #AD76D8 37%, #8E3CCC 100%)',
    zIndex: 102,
    transform: bubbleWrapperProps.onMobile ? (bubbleWrapperProps.index % 2 === 0 ? 'translateX(25%) rotate(45deg) scale(0.8)' : 'translateX(-25%) translateY(50%) rotate(45deg) scale(0.8)') : bubbleWrapperProps.index < 4 ? 'translateX(25%) translateY(22%) rotate(45deg) scale(0.8)' : 'translateX(-25%) translateY(-22%) rotate(45deg) scale(0.8)',
  },
  boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important',
  transform: bubbleWrapperProps.onMobile ? (bubbleWrapperProps.index % 2 === 0 ? 'translateX(25%) rotate(45deg) scale(0.7071)' : 'translateX(-25%) translateY(50%) rotate(45deg) scale(0.7071)') : bubbleWrapperProps.index < 4 ? 'translateX(25%) translateY(25%) rotate(45deg) scale(0.66)' : 'translateX(-25%) translateY(-25%) rotate(45deg) scale(0.66)',
}));

const BubbleContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  textAlign: 'center',
  width: '100%',
  transform: 'rotate(-45deg) translate(-50%, -50%)',
}));

const BubbleCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  minHeight: '38px',
  fontWeight: '500',
  textTransform: 'none',
  margin: 'auto',
  width: '85%',
}));

const BubbleImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'size',
})<{ width?: string; size?: string }>(({ theme, width, size }) => {
  return {
    width: '60%',
  }
});

export default Bubble;
