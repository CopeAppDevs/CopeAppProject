package com.copeapp.entities.market;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.copeapp.entities.common.User;

import lombok.Data;
import lombok.NonNull;

@Data
@Entity
@Table(name = "markets")
public class Market {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="marketGenerator")
	@SequenceGenerator(name="marketGenerator", sequenceName="market_sequence", allocationSize = 1, initialValue = 50)
	private Integer marketId = null;
	
	@NonNull
	private String name = null;

	private String description = null;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date openDate = null;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date expireDate = null;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date visibleDate = null;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date hiddenDate = null;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate = null;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date eliminationDate = null;
	
	@NonNull
	@ManyToOne
	@JoinColumn(name = "creatorId")
	private User creator = null;
	
	@ManyToOne
	@JoinColumn(name = "eliminatorId")
	private User eliminator = null;
	
	@NonNull
	@ManyToMany
	@JoinTable( name = "markets_elements",
			joinColumns = { @JoinColumn(name = "marketId") },
			inverseJoinColumns = { @JoinColumn(name = "marketElementId") } )
	private List<MarketElement> marketElements = null;
	
	/*
	 * openDate: data dalla quale il market � aperto al pubblico
	 * expireDate: data dalla quale il market viene chiuso al pubblico
	 * visibleDate: data dalla quale il market � visibile nell'elenco dei market
	 * 				(tale data deve precedere o essere coincidente alla openDate)
	 * hiddenDate: data dalla quale il market non � pi� visibile nell'elenco dei market
	 * 			   (tale data deve succedere o essere coincidente alla expireDate)
	 * creationDate: data di creazione del market
	 * eliminationDate: data di eliminazione del market
	 * marketElements: lista degli elementi che il market offre
	 */
}
