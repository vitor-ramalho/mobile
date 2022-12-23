import { ActivityIndicator } from "react-native";
import { Text } from "../Text";
import { Container } from "./style";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ disabled, children, onPress, loading }: ButtonProps) {
  return (
    <Container
      onPress={onPress}
      disabled={disabled || loading}
    >
      {!loading && (
        <Text
          weight="600"
          color="#fff"
        >
          {children}
        </Text>
      )}

      {loading && (
        <ActivityIndicator color="#fff" />
      )}
    </Container>
  );
}