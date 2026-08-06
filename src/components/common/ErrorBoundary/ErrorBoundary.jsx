import React from "react";
import ErrorPage from "../../../pages/common/ErrorPage/ErrorPage";

/**
 * Bắt mọi lỗi phát sinh khi render ở cây component con và hiển thị ErrorPage
 * thay vì để React unmount toàn bộ app (màn hình trắng).
 *
 * Lưu ý: đây là ngoại lệ duy nhất phải dùng class component — React chưa có
 * hook tương đương cho componentDidCatch / getDerivedStateFromError.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // Chỉ log khi chạy dev; ở production không đẩy lỗi ra console của người dùng.
    if (import.meta.env.DEV) {
      console.warn("[ErrorBoundary] đã bắt được lỗi render:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} onRetry={this.handleReset} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
