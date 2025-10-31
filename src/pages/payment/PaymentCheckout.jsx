import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";
import { MdLightMode, MdDarkMode } from "react-icons/md";

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = generateRandomString();

const amount = {
  currency: "KRW",
  value: 50000,
};

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.400");
  const selectedBg = useColorModeValue("blue.50", "blue.900");
  const selectedBorder = useColorModeValue("blue.500", "blue.300");

  function selectPaymentMethod(method) {
    setSelectedPaymentMethod(method);
  }

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, [clientKey, customerKey]);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    switch (selectedPaymentMethod) {
      case "CARD":
        await payment.requestPayment({
          method: "CARD", // 카드 및 간편결제
          amount,
          orderId: generateRandomString(), // 고유 주문번호
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success", // 결제 요청이 성공하면 리다이렉트되는 URL
          failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
        break;
      case "TRANSFER":
        await payment.requestPayment({
          method: "TRANSFER", // 계좌이체 결제
          amount,
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
          transfer: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
          },
        });
        break;
      case "VIRTUAL_ACCOUNT":
        await payment.requestPayment({
          method: "VIRTUAL_ACCOUNT", // 가상계좌 결제
          amount,
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
          virtualAccount: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
            validHours: 24,
          },
        });
        break;
      case "MOBILE_PHONE":
        await payment.requestPayment({
          method: "MOBILE_PHONE", // 휴대폰 결제
          amount,
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
        });
        break;
      case "CULTURE_GIFT_CERTIFICATE":
        await payment.requestPayment({
          method: "CULTURE_GIFT_CERTIFICATE", // 문화상품권 결제
          amount,
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
        });
        break;
      case "FOREIGN_EASY_PAY":
        await payment.requestPayment({
          method: "FOREIGN_EASY_PAY", // 해외 간편결제
          amount: {
            value: 100,
            currency: "USD",
          },
          orderId: generateRandomString(),
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/payment/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
          foreignEasyPay: {
            provider: "PAYPAL", // PayPal 결제
            country: "KR",
          },
        });
        break;
    }
  }

  async function requestBillingAuth() {
    await payment.requestBillingAuth({
      method: "CARD", // 자동결제(빌링)은 카드만 지원합니다
      successUrl: window.location.origin + "/payment/billing", // 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/fail", // 요청이 실패하면 리다이렉트되는 URL
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box position="absolute" top={4} right={4}>
        <IconButton
          icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
        />
      </Box>

      <VStack spacing={8} align="stretch">
        {/* 일반 결제 섹션 */}
        <Box
          bg={bgColor}
          p={8}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="md"
        >
          <Heading size="lg" mb={6}>
            일반 결제
          </Heading>
          
          <HStack spacing={3} mb={6} flexWrap="wrap">
            <Button
              size="md"
              variant={selectedPaymentMethod === "CARD" ? "solid" : "outline"}
              colorScheme="blue"
              bg={selectedPaymentMethod === "CARD" ? selectedBg : "transparent"}
              borderColor={selectedPaymentMethod === "CARD" ? selectedBorder : borderColor}
              onClick={() => selectPaymentMethod("CARD")}
            >
              카드
            </Button>
            <Button
              size="md"
              variant={selectedPaymentMethod === "TRANSFER" ? "solid" : "outline"}
              colorScheme="blue"
              bg={selectedPaymentMethod === "TRANSFER" ? selectedBg : "transparent"}
              borderColor={selectedPaymentMethod === "TRANSFER" ? selectedBorder : borderColor}
              onClick={() => selectPaymentMethod("TRANSFER")}
            >
              계좌이체
            </Button>
            <Button
              size="md"
              variant={selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "solid" : "outline"}
              colorScheme="blue"
              bg={selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? selectedBg : "transparent"}
              borderColor={selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? selectedBorder : borderColor}
              onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}
            >
              가상계좌
            </Button>
            <Button
              size="md"
              variant={selectedPaymentMethod === "MOBILE_PHONE" ? "solid" : "outline"}
              colorScheme="blue"
              bg={selectedPaymentMethod === "MOBILE_PHONE" ? selectedBg : "transparent"}
              borderColor={selectedPaymentMethod === "MOBILE_PHONE" ? selectedBorder : borderColor}
              onClick={() => selectPaymentMethod("MOBILE_PHONE")}
            >
              휴대폰
            </Button>
            <Button
              size="md"
              variant={selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? "solid" : "outline"}
              colorScheme="blue"
              bg={selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? selectedBg : "transparent"}
              borderColor={selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? selectedBorder : borderColor}
              onClick={() => selectPaymentMethod("CULTURE_GIFT_CERTIFICATE")}
            >
              문화상품권
            </Button>
            <Button
              size="md"
              variant={selectedPaymentMethod === "FOREIGN_EASY_PAY" ? "solid" : "outline"}
              colorScheme="blue"
              bg={selectedPaymentMethod === "FOREIGN_EASY_PAY" ? selectedBg : "transparent"}
              borderColor={selectedPaymentMethod === "FOREIGN_EASY_PAY" ? selectedBorder : borderColor}
              onClick={() => selectPaymentMethod("FOREIGN_EASY_PAY")}
            >
              해외간편결제
            </Button>
          </HStack>

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            onClick={requestPayment}
            isDisabled={!selectedPaymentMethod}
          >
            결제하기
          </Button>
        </Box>

        {/* 정기 결제 섹션 */}
        <Box
          bg={bgColor}
          p={8}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="md"
        >
          <Heading size="lg" mb={6}>
            정기 결제
          </Heading>
          
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            onClick={requestBillingAuth}
          >
            빌링키 발급하기
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}