import axios from "axios";
import * as Print from "expo-print";
import { appTheme } from "../colors";
import { search } from "../api/apiConfig";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import SummaryTable from "../components/SummaryTable";
import DownloadSummary from "../components/DownloadSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, SafeAreaView, ActivityIndicator, View } from "react-native";

const ScannerSummaryScreen = ({ route, navigation }) => {
    const { lotNumber } = route.params;

    const endPoint = search + lotNumber;
    const [lotData, setLotData] = useState();
    const [testReportPDF, setTestReportPDF] = useState();
    const [loader, setLoader] = useState(false);

    const getApiData = async () => {
        try {
            setLoader(true);

            const credentials = await AsyncStorage.getItem("basicAuth");
            const response = await axios.get(endPoint, {
                headers: { Authorization: credentials },
            });

            const lotDataObj = {
                status: true,
                data: response?.data?.test_report_items
            };

            setLotData(lotDataObj);
            setTestReportPDF(response?.data?.test_report_summary);
            setLoader(false);

        } catch (error) {
            const lotDataObj = {
                status: false,
                data: error?.response?.data?.message,
            };

            setLotData(lotDataObj);
            setLoader(false);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleDownload = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission needed",
                    "This app needs access to your Media library "
                );
                return;
            }

            // console.log('Starting download..!!');
            const downloadResumable = FileSystem.createDownloadResumable(
                testReportPDF,
                FileSystem.cacheDirectory + `${lotNumber}.pdf`
            );
            const { uri } = await downloadResumable.downloadAsync(null, {
                shouldCache: false,
            });
            // console.log('Download completed successfully', uri);

            await Print.printAsync({ uri });

            // const asset = await MediaLibrary.createAssetAsync(uri);
            // console.log('Asset created successfully', asset);

            // await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: appTheme.backgroundColor }}
            >
                <Ionicons
                    name="close-sharp"
                    size={24}
                    onPress={() => navigation.navigate("Home")}
                    style={{ margin: 15, color: "black" }}
                />
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 15 }}>
                    Reference No. - {lotNumber}
                </Text>

                {
                    loader
                        ?
                        <View style={{ paddingTop: 100 }}>
                            <ActivityIndicator size="large" color={appTheme.primaryColor} />
                        </View>
                        :
                        <>
                            {
                                lotData?.status
                                    ? <SummaryTable lotData={lotData.data} />
                                    : <View
                                        style={{
                                            flex: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 25, color: appTheme.primaryColor }}>
                                            Lot Number Not Found!
                                        </Text>
                                    </View>
                            }
                        </>
                }

                {lotData?.status && <DownloadSummary handleDownload={handleDownload} />}

            </SafeAreaView>
        </>
    );
};

export default ScannerSummaryScreen;
