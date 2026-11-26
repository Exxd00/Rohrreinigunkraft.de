"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Download, Loader2, Phone, FileText, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/lib/useAdminAuth";

interface ReportData {
  campaigns?: Array<{
    name: string;
    clicks: number;
    impressions: number;
    cost: number;
    conversions: number;
  }>;
  summary?: {
    totalClicks: number;
    totalImpressions: number;
    totalCost: number;
    totalConversions: number;
  };
  error?: string;
}

export default function GoogleAdsPage() {
  // Auth state
  const { isAuthenticated, isCheckingAuth, login, logout } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Report state
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [reportType, setReportType] = useState<string>("performance");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await login(password)) {
      setPassword("");
      setAuthError("");
    } else {
      setAuthError("كلمة المرور غير صحيحة");
    }
  };

  const fetchReport = async () => {
    setIsLoading(true);
    setReportData(null);

    try {
      const response = await fetch(
        `/api/google-ads/reports?type=${reportType}&startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      if (data.success) {
        setReportData(data);
      } else {
        setReportData({ error: data.error || "فشل جلب التقرير" });
      }
    } catch (error) {
      setReportData({ error: "خطأ في الاتصال: " + String(error) });
    }

    setIsLoading(false);
  };

  const downloadCSV = async () => {
    window.open(
      `/api/google-ads/reports?type=${reportType}&startDate=${startDate}&endDate=${endDate}&format=csv`,
      '_blank'
    );
  };

  // Loading check
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Google Ads Reports</CardTitle>
            <CardDescription>أدخل كلمة المرور</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <p className="text-red-500 text-sm text-center">{authError}</p>
              )}
              <Button type="submit" className="w-full">دخول</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📊 تقارير Google Ads
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void logout()}
          >
            خروج
          </Button>
        </div>

        {/* Report Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              جلب تقرير
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>من تاريخ</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>إلى تاريخ</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Report Type */}
            <div>
              <Label>نوع التقرير</Label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg bg-white dark:bg-gray-800"
              >
                <option value="rrk_daily">حملة RRK حسب اليوم</option>
                <option value="rrk_keywords">كلمات حملة RRK وتكاليفها</option>
                <option value="rrk_terms">عبارات البحث الظاهرة لحملة RRK</option>
                <option value="rrk_urls">إعدادات روابط RRK حسب المستوى</option>
                <option value="performance">الأداء العام</option>
                <option value="campaigns">الحملات</option>
                <option value="keywords">الكلمات المفتاحية</option>
                <option value="conversions">التحويلات</option>
                <option value="calls">المكالمات</option>
                <option value="complete">تقرير شامل</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button onClick={fetchReport} disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin ml-2" /> جاري الجلب...</>
                ) : (
                  <><TrendingUp className="w-4 h-4 ml-2" /> جلب التقرير</>
                )}
              </Button>
              <Button onClick={downloadCSV} variant="outline">
                <Download className="w-4 h-4 ml-2" /> CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {reportData && (
          <Card>
            <CardHeader>
              <CardTitle>النتائج</CardTitle>
            </CardHeader>
            <CardContent>
              {reportData.error ? (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-700 dark:text-red-300">
                  {reportData.error}
                </div>
              ) : (
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto text-sm max-h-96">
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setReportType("conversions");
            fetchReport();
          }}>
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">تقرير التحويلات</h3>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setReportType("campaigns");
            fetchReport();
          }}>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">تقرير الحملات</h3>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setReportType("complete");
            fetchReport();
          }}>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">تقرير شامل</h3>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
