import { useState } from "react";
import { FlatList } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import { AddToCardButton, ProductContainer, ProductDetails, ProductImage, Separator } from "./styles";

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[]
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        ItemSeparatorComponent={Separator}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer
            onPress={() => handleOpenModal(product)}
          >
            <ProductImage
              source={{
                uri: `http://192.168.31.127:3001/uploads/${product.imagePath}`
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text
                color="#666"
                size={14}
                style={{ marginVertical: 8 }}
              >
                {product.description}
              </Text>
              <Text weight="600" size={14}>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCardButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCardButton>
          </ProductContainer>
        )}
      />
    </>
  );
}