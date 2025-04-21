import Image from 'next/image';
import { Mail, Phone, Globe, CreditCard } from 'lucide-react';

export default function BusinessCard() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-500">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 w-fit">
        <div className="p-8 w-fit">
          <div className="flex items-center space-x-8 mb-6">
            <div className="flex-shrink-0">
              <img
                src="https://komu.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_content.3a234b2d.png&w=1920&q=75"
                alt="NCC Logo"
                width={200}
                height={100}
                className="mb-2"
              />
            </div>
            <div className="border-l border-gray-200 pl-8">
              <div className="uppercase tracking-wide text-lg text-black font-semibold">
                Pham Tiến Ánh
              </div>
              <p className="text-gray-500">Developer</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  anh.phamtien@ncc.asia
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  (+84) 944802869
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  https://www.ncc.asia
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Bank Transfer Information
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Account Name: PHAM TIEN ANH
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 mr-2" />
                    1903 7809 6660 11
                  </div>
                  <p className="text-sm text-gray-600">Bank: TECHCOMBANK</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5W2YpVD91OwagUOKOx5UQNU7NH4RVF.png"
                  alt="QR Code for bank transfer"
                  width={120}
                  height={120}
                  className="mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
