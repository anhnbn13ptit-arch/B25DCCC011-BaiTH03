# ShopMini

Bài tập thực hành 03 (TH02) - Mã lớp: RIPT1306-20261-05

Đây là ứng dụng cửa hàng mini được làm bằng **React + TypeScript (Vite)**. Trong bài này em dùng **Context API** và **Redux Toolkit** để quản lý state toàn cục.

## 1. Công nghệ sử dụng

- React + TypeScript (tạo bằng Vite)
- React Router DOM (chia trang)
- Redux Toolkit + React Redux (quản lý sản phẩm và giỏ hàng)
- Context API (quản lý theme và đăng nhập)
- CSS thuần (có dùng CSS variables để đổi theme sáng/tối)
- API: https://fakestoreapi.com/products

## 2. Cách chạy project

```bash
npm install
npm run dev
```

Sau đó mở trình duyệt vào địa chỉ `http://localhost:5173/`.

Muốn kiểm tra lỗi TypeScript và build thì chạy:

```bash
npm run build
```

## 3. Chức năng chính

- Trang chủ (`/`): hiển thị danh sách sản phẩm dạng lưới (điện thoại 1 cột, tablet 2 cột, desktop 4 cột), có ô tìm kiếm theo tên sản phẩm.
- Chi tiết sản phẩm (`/products/:id`): xem ảnh, tên, giá, mô tả, danh mục và thêm vào giỏ.
- Giỏ hàng (`/cart`): tăng, giảm số lượng, xoá sản phẩm, xem tổng tiền.
- Đăng nhập (`/login`): đăng nhập giả lập.
- Thanh toán (`/checkout`): là protected route, bấm "Đặt hàng" sẽ xoá giỏ hàng và hiện thông báo thành công.
- Trang 404 cho các đường dẫn không tồn tại.
- Header dùng chung cho mọi trang: số lượng sản phẩm trong giỏ, tên người dùng, nút đăng xuất, nút đổi theme sáng/tối.

**Tài khoản đăng nhập thử:** tên đăng nhập nhập gì cũng được (không được để trống), mật khẩu phải là `123456`.

## 4. Cấu trúc thư mục

```
src/
├── app/
│   ├── store.ts            (configureStore, RootState, AppDispatch)
│   └── hooks.ts            (useAppDispatch, useAppSelector)
├── features/
│   ├── products/productsSlice.ts
│   └── cart/cartSlice.ts
├── contexts/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── components/
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProtectedRoute.tsx
├── layouts/MainLayout.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── LoginPage.tsx
│   ├── CheckoutPage.tsx
│   └── NotFoundPage.tsx
├── types/index.ts          (Product, CartItem, User)
├── App.tsx                 (khai báo Routes)
└── main.tsx                (bọc Provider, ThemeProvider, AuthProvider, BrowserRouter)
```

## 5. Dữ liệu nào để ở đâu và vì sao

Em chia state thành 3 loại theo mức độ chia sẻ và độ phức tạp của dữ liệu.

| Dữ liệu | Nơi lưu | Lý do |
|---|---|---|
| Từ khoá tìm kiếm (`keyword`) ở trang chủ | `useState` trong `HomePage` | Chỉ có một component dùng, các trang khác không cần biết nên không cần đưa lên toàn cục. |
| Ô nhập username, password và thông báo lỗi ở form đăng nhập | `useState` trong `LoginPage` | Là dữ liệu tạm thời của form, đăng nhập xong là bỏ, không ai khác cần dùng. |
| Biến `ordered` (đã đặt hàng chưa) ở trang thanh toán | `useState` trong `CheckoutPage` | Chỉ dùng để đổi giao diện trong trang này, rời trang là hết cần. |
| Theme sáng/tối (`theme`, `toggleTheme`) | Context (`ThemeContext`) | Nhiều component cần đọc (Header, toàn bộ giao diện), dữ liệu đơn giản và ít thay đổi nên dùng Context là đủ, không cần Redux. |
| Người dùng đang đăng nhập (`user`, `login`, `logout`) | Context (`AuthContext`) | Header, `ProtectedRoute`, `LoginPage` đều cần dùng. State chỉ gồm user và 2 hàm nên Context là hợp lý. |
| Danh sách sản phẩm và trạng thái `loading / succeeded / failed` | Redux (`productsSlice`) | Dữ liệu lấy từ API (bất đồng bộ), có nhiều trạng thái cần xử lý, và nhiều trang dùng chung (trang chủ, chi tiết). Dùng `createAsyncThunk` xử lý gọn hơn. |
| Giỏ hàng (`items`) | Redux (`cartSlice`) | Có nhiều thao tác (thêm, xoá, sửa số lượng, xoá hết), nhiều trang cùng dùng (Header, giỏ hàng, thanh toán) và cần selector để tính tổng số lượng và tổng tiền. |

### Giải thích thêm

- **`useState`** dùng cho dữ liệu "nội bộ" của một component hoặc một trang. Nếu đưa mấy cái này lên Redux hay Context thì code dài ra mà không có lợi gì.
- **Context API** dùng cho dữ liệu cần chia sẻ nhiều nơi nhưng đơn giản (theme và user). Context ít phải cấu hình nên làm nhanh. Nhược điểm là khi giá trị trong Context đổi thì tất cả component đang dùng nó đều render lại, nên em không dùng cho dữ liệu đổi liên tục.
- **Redux Toolkit** dùng cho dữ liệu phức tạp: có gọi API, có nhiều action, và cần tính toán bằng selector. Dùng Redux còn giúp em theo dõi được state thay đổi như thế nào qua từng action.

## 6. Một số lưu ý khi làm bài

- Khi người dùng nhấn F5 ngay ở trang `/products/:id` thì store đang trống, nên trang chi tiết phải tự gọi lại `fetchProducts()` nếu `status` đang là `idle`.
- `ProtectedRoute` lưu lại đường dẫn trước đó vào `location.state`, nhờ vậy sau khi đăng nhập xong sẽ quay lại đúng trang đang muốn vào (ví dụ `/checkout`).
- Toàn bộ code dùng TypeScript, không dùng kiểu `any`.
- Đăng nhập chỉ là giả lập ở phía client, user không được lưu lại nên tải lại trang (F5) thì phải đăng nhập lại.
