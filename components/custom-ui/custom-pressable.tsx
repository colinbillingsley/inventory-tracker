import clsx from "clsx";
import { styled } from "nativewind";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  pressedClassName?: string;
};

const CustomPressable = ({
  children,
  onPress,
  className = "",
  textClassName = "",
  pressedClassName = "opacity-40",
}: Props) => {
  const [pressed, setPressed] = useState(false);

  return (
    <StyledPressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={clsx(className, pressed && pressedClassName)}
    >
      {typeof children === "string" ? (
        <StyledText className={textClassName}>{children}</StyledText>
      ) : (
        children
      )}
    </StyledPressable>
  );
};

export default CustomPressable;
