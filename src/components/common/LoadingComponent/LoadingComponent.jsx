import { Spin } from "antd";

export const LoadingComponent = ({children,isPending,delay = 200}) => {
  return (
    <Spin spinning={isPending} delay={delay}>
        {children}
    </Spin>
  )
};
