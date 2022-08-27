package com.payment.entity;

import java.io.Serializable;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.LongType;
import org.hibernate.type.Type;

public class StringCustomId extends SequenceStyleGenerator {

	// public class StringSequenceGenerator extends SequenceStyleGenerator {

	public static final String VALUE_PREFIX_PARAMETER = "valuePrefix";
	public static final String VALUE_PREFIX_DEFAULT = "valuePrefix";

	private String valuePrefix;

	public static final String NUMBER_FORMAT_PARAMETER = "numberFormat";
	public static final String NUMBER_FORMAT_DEFAULT = "%d";
	private String numberFormat;

	@Override
	public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
		super.configure(LongType.INSTANCE, params, serviceRegistry);
		valuePrefix = ConfigurationHelper.getString(VALUE_PREFIX_PARAMETER, params, VALUE_PREFIX_DEFAULT);
		numberFormat = ConfigurationHelper.getString(NUMBER_FORMAT_PARAMETER, params, NUMBER_FORMAT_DEFAULT);
	}

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		return valuePrefix + String.format(numberFormat, super.generate(session, object));
	}
}

//	
//	@Override
//	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
//		// TODO Auto-generated method stub
//		String prefix = "SLH_";
//		Connection connection = session.connection();
//
//		try {
//			Statement statement = connection.createStatement();
//
//			ResultSet rs = statement.executeQuery("select count(guestId) as Id  from Payment ");
//
//			if (rs.next()) {
//				int id = rs.getInt(1) + 10000;
//				// int id = rs.getInt(1) + 10000 ;-->out - SLH10001 ;
//				// int id = rs.getInt(1)+ 00001; --> output - SLH1 ;
//				String generatedId = prefix + new Integer(id).toString();
//				return generatedId;
//			}
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
//
//		return null;
//	}
