import { render } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
test('our first react test case', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()

})
// test('our first react test case', () => {
//     const { getByText } = render(<Button>Nice</Button>)
//     const element = getByText('Nice')
//     expect(element).toBeTruthy()
//     expect(element).toBeInTheDocument()
// })