import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SummaryTable = ({ lotData }) => {

    return (
        <View style={{ margin: 15, borderWidth: 1, borderColor: '#d9d9d9' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold', fontSize: 15 }]}>Parameter</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold', fontSize: 15 }]}>Reading</Text>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold', fontSize: 15 }]}>Parameter</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold', fontSize: 15 }]}>Reading</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold' }]}>UHML</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold' }]}>{parseFloat(lotData?.uhml).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold' }]}>Rd</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold' }]}>{parseFloat(lotData?.rd).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold' }]}>STRENGTH</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold' }]}>{parseFloat(lotData?.str).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold' }]}>+b</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold' }]}>{parseFloat(lotData?.plus_b).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold' }]}>MIC</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold' }]}>{parseFloat(lotData?.mic).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5, fontWeight: 'bold' }]}>CG</Text>
                <Text style={[styles.tableCell, { flex: 4, fontWeight: 'bold' }]}>{lotData?.cgrd}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5 }]}>SCI</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.sci).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5 }]}>Elongation</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.elg).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5 }]}>Moisture</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.mst_percent).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5 }]}>Trash cnt</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{lotData?.trcnt}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5 }]}>Uniformity</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.ui).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5 }]}>Trash Area</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.trar).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5 }]}>Short Fibre</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.sf).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5 }]}>Trash ID</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.trid).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableCell, { flex: 5 }]}>Mat</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.mat).toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 5 }]}>Trash AMT</Text>
                <Text style={[styles.tableCell, { flex: 4 }]}>{parseFloat(lotData?.amt).toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default SummaryTable;

const styles = StyleSheet.create({

    tableCell: {
        borderWidth: 1,
        borderColor: '#d9d9d9',
        padding: 8,
    }
})


