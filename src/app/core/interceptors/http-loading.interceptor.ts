import { HttpInterceptorFn } from '@angular/common/http';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNzA3NzkyOCwianRpIjoiM2I2OGRlY2EtYWFiYi00Nzk5LTllMGMtYmRmZGFhNzg5ODM3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkIxMzc2NTQ5MCIsIm5iZiI6MTcxNzA3NzkyOCwiY3NyZiI6IjI4MTQ2NmZjLTdhMzQtNDFmMC1iODBhLTU0MDUyMGMzMTliYyIsImV4cCI6MTcxNzA4MTUyOCwibmFtZSI6IjFLT01NQTVERUdSRUVTUy5MLiIsImFkZHJlc3MiOiJWaWFkZWxhc0Rvc0Nhc3RpbGxhczMzRWRpZmljaW9BVElDQTI4MjI0UG96dWVsb2RlQWxhcmNvbihNYWRyaWQpIiwibmlmIjoiQjEzNzY1NDkwIiwic2VjdGlvbiI6Ikluc3RhbGFkb3JlcyBlIEluZ2VuaWVyXHUwMGVkYXMiLCJlbWFpbCI6ImFsdmFyby5kZXNpbW9uQDFrb21tYTVncmFkLmNvbSJ9.Cq-aGUMLJ7ybPWIkjn9tYWbu0QTc1RcNRn5yfJuaaks'
  // const token: string | null = localStorage.getItem('token');
  let request = req;
  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  return next(request);
};
